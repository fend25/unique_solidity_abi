import packageVersions from 'pkg-versions'
import Semver, {SemVer} from 'semver'
import {program} from 'commander'
import fs from 'node:fs/promises'

const PACKAGE_JSON_PATH = './dist/package.json' as const
//@ts-ignore
const packageJson = JSON.parse(await fs.readFile(PACKAGE_JSON_PATH, 'utf-8'))

const versions = Array.from(await packageVersions(packageJson.name))

const semvers = versions.map(version => Semver.parse(version)).filter(ver => ver!!) as Semver.SemVer[]
const regular = semvers.filter(ver => ver.prerelease.length === 0)
const beta = semvers.filter(ver => ver.prerelease.length !== 0)

const currentRegular: SemVer = regular.pop() || Semver.parse('0.0.0') as Semver.SemVer
const currentBeta: SemVer | null = beta.pop() || null

const regularNextPatch = Semver.parse(currentRegular.format())!.inc('patch')
const regularNextMinor = Semver.parse(currentRegular.format())!.inc('minor')
const regularNextMajor = Semver.parse(currentRegular.format())!.inc('major')

const nextBeta = currentBeta
  ? Semver.parse(currentBeta.format())!.inc('prerelease', 'beta')
  : Semver.parse(regularNextPatch.format())!.inc('prerelease', 'beta')


console.log(currentRegular.format())
console.log(regularNextPatch.format())
console.log(regularNextMinor.format())
console.log(regularNextMajor.format())
console.log(nextBeta.format())

program
  .option('--beta')
  .option('--patch')
  .option('--minor')
  .option('--major')

program.parse()

const options = program.opts()
console.log(options)

if (options.beta) {
  packageJson.version = nextBeta.format()
} else if (options.patch) {
  packageJson.version = regularNextPatch.format()
} else if (options.minor) {
  packageJson.version = regularNextMinor.format()
} else if (options.major) {
  packageJson.version = regularNextMajor.format()
}

await fs.writeFile(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2))

