/* eslint-disable @typescript-eslint/explicit-function-return-type */
const fsPromise = import("fs");

class PackageDistWriter {
  toCjsDirectory() {
    fsPromise
      .then(fs => this.writePackageJsonToDist(fs, "commonjs", ""))
      .catch(error => {
        console.log(`Error importing fs module: ${error}`);
      });

    return this;
  }

  toEsmDirectory() {
    fsPromise
      .then(fs => this.writePackageJsonToDist(fs, "module", ""))
      .catch(error => {
        console.log(`Error importing fs module: ${error}`);
      });

    return this;
  }

  writePackageJsonToDist(fs, type) {
    const directory = type === "module" ? "esm" : "cjs";

    fs.writeFile(
      `./dist/${directory}/package.json`,
      `
      {
        "type": "${type}"
      }
      `,
      "utf8",
      err => {
        this.handleFileError(err);
      },
    );
  }

  handleFileError(err) {
    if (err) {
      throw new Error(`Error reading file from disk: ${err}`);
    }
  }
}

new PackageDistWriter().toCjsDirectory().toEsmDirectory();
