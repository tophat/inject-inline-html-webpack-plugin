module.exports = {
    git: {
        push: true,
    },
    changesetIgnorePatterns: ['**/*.test.ts', '**/*.test.js'],
    conventionalChangelogConfig: '@tophat/conventional-changelog-config',
    autoCommit: true,
    autoCommitMessage:
        'chore: release inject-inline-html-webpack-plugin [skip ci]',
    changelogFilename: 'CHANGELOG.md',
    persistVersions: true,
}
