import InjectInlineHtmlWebpackPlugin from '.'

describe('Plugin Test', () => {
    it('exports the plugin', () => {
        expect(() => {
            new InjectInlineHtmlWebpackPlugin()
        }).not.toThrow()
    })
})
