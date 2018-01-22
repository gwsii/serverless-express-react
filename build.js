const cp = require('child_process')
const fs = require('fs')
const path = require('path')

if (!process.env.STAGE) {
  throw new Error('STAGE environment variable must be set.')
}

// Init & Read package.json
const reactAppPackagePath = path.join(__dirname, 'browser-client', 'package.json')
const reactAppPackageBackup = reactAppPackagePath + '.bak'
const reactAppPackage = fs.readFileSync(reactAppPackagePath, 'utf8')
console.log(reactAppPackage)
const package = JSON.parse(reactAppPackage)

// Backup & Replace with updated package
const buildPackage = Object.assign({ homepage: `/${process.env.STAGE}/`}, package)
fs.writeFileSync(reactAppPackageBackup, reactAppPackage)
fs.writeFileSync(reactAppPackagePath, JSON.stringify(buildPackage))

// Run the app build
console.log(`Building for STAGE "${process.env.STAGE}"...`)
cp.execSync('npm run build', { cwd: path.join(__dirname, 'browser-client') })

// Restore package
fs.writeFileSync(reactAppPackagePath, reactAppPackage)
fs.unlinkSync(reactAppPackageBackup)

console.log(`Done.`)
