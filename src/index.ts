import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Compiler, SingleEntryPlugin, compilation } from 'webpack'

const PLUGIN_NAME = 'InjectInlineHtmlWebpackPlugin'

declare module 'html-webpack-plugin' {
    class HtmlWebpackPlugin {
        public options?: HtmlWebpackPlugin.Options & {
            inlineScripts?: string[]
        }
    }
}

export interface InjectInlineHtmlWebpackPluginOptions {
    runtimeChunkName?: string
    chunkPrefix?: string
}

/**
 * This plugin will inject raw scripts into the head of the
 * generated HTML file from HtmlWebpackPlugin.
 *
 * ```
 * new HtmlWebpackPlugin({
 *   inlineScripts: ['my-script.js'],
 * }),
 * new InjectInlineHtmlWebpackPlugin()
 * ```
 */
class InjectInlineHtmlWebpackPlugin {
    private scripts: string[]
    private options: InjectInlineHtmlWebpackPluginOptions

    constructor(options?: InjectInlineHtmlWebpackPluginOptions) {
        this.options = options ?? {}
        this.scripts = []
    }

    apply(compiler: Compiler): void {
        compiler.hooks.beforeRun.tapAsync(
            PLUGIN_NAME,
            this.tapBeforeRun.bind(this),
        )
        compiler.hooks.watchRun.tapAsync(
            PLUGIN_NAME,
            this.tapBeforeRun.bind(this),
        )
        compiler.hooks.compilation.tap(
            PLUGIN_NAME,
            this.tapCompilation.bind(this),
        )
    }

    getScriptKeyName(script: string): string {
        const prefix = this.options.chunkPrefix ?? 'inject_inline'
        return `${prefix}-${this.scripts.findIndex(s => s === script)}`
    }

    tapBeforeRun(compiler: Compiler, done: (...args: unknown[]) => void): void {
        // parse set of inline scripts from the html webpack configs
        const inlineScripts = compiler.options.plugins
            ?.filter(plugin => plugin instanceof HtmlWebpackPlugin)
            .map(
                plugin =>
                    (plugin as HtmlWebpackPlugin.HtmlWebpackPlugin).options
                        ?.inlineScripts ?? [],
            )
            .flat() as string[]

        this.scripts.push(...new Set(inlineScripts ?? []))

        for (const script of this.scripts) {
            new SingleEntryPlugin(
                process.cwd(),
                script,
                this.getScriptKeyName(script),
            ).apply(compiler)
        }
        done()
    }

    tapCompilation(compilation: compilation.Compilation): void {
        const hooks = HtmlWebpackPlugin.getHooks(compilation)
        hooks.alterAssetTagGroups.tapAsync(PLUGIN_NAME, (data, done) => {
            const inlineScripts = [
                ...(data.plugin.options?.inlineScripts ?? []),
            ]
            this.inlineRuntime(compilation, data)
            Promise.all(
                inlineScripts.map(async inlineScript => {
                    const scriptModule = compilation.modules.find(
                        m => m.rawRequest === inlineScript,
                    )
                    const assetKey = Object.keys(compilation.assets).find(key =>
                        key.startsWith(
                            `${this.getScriptKeyName(inlineScript)}-`,
                        ),
                    )
                    if (scriptModule && assetKey) {
                        const sourceCode = compilation.assets[assetKey].source()
                        data.headTags.push(
                            this.createInlineScriptTag(sourceCode),
                        )
                    }
                }),
            ).then(() => {
                done(null, data)
            })
        })
    }

    createInlineScriptTag(source: string): HtmlWebpackPlugin.HtmlTagObject {
        return {
            tagName: 'script',
            innerHTML: `\n${source.trim()}\n`,
            voidTag: false,
            attributes: {},
        }
    }

    inlineRuntime(
        compilation: compilation.Compilation,
        data: {
            bodyTags: HtmlWebpackPlugin.HtmlTagObject[]
            headTags: HtmlWebpackPlugin.HtmlTagObject[]
            outputName: string
            plugin: HtmlWebpackPlugin.HtmlWebpackPlugin
        },
    ): void {
        const runtimeChunkName = this.options.runtimeChunkName ?? 'runtime'
        const runtimeFilename = Object.keys(
            compilation.assets,
        ).find(assetName => assetName.startsWith(runtimeChunkName))

        if (!runtimeFilename) return

        const asset = compilation.assets[runtimeFilename]
        if (!asset) return

        data.bodyTags = data.bodyTags.filter(
            (tag: HtmlWebpackPlugin.HtmlTagObject) =>
                !(tag?.attributes?.src as string | undefined)?.endsWith(
                    runtimeFilename,
                ),
        )

        data.headTags.push(this.createInlineScriptTag(asset.source()))
    }
}

export default InjectInlineHtmlWebpackPlugin
