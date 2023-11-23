/* eslint-disable @typescript-eslint/explicit-function-return-type */
const fsPromise = import("fs");

class PackageRootUpdater {
  parsePackageJson() {
    // Read the package.json file
    fsPromise
      .then(fs => {
        fs.readFile("./package.json", "utf8", (err, data) => {
          this.handleFileError(err);

          const modifiedPackageJson = this.modifyPackageJson(data);

          this.writePackageJsonBackToDisk(fs, modifiedPackageJson);
        });
      })
      .catch(error => {
        console.log(`Error importing fs module: ${error}`);
      });
  }

  writePackageJsonBackToDisk(fs, modifiedPackageJson) {
    fs.writeFile("./package.json", modifiedPackageJson + "\n", "utf8", err => {
      this.handleFileError(err);
    });
  }

  modifyPackageJson(data) {
    // Parse the file data (which is a string) as JSON
    const packageJson = JSON.parse(data);

    // Now you can modify the packageJson object as needed
    packageJson.type = this.packageType();

    // Convert the JSON object back to a string
    return JSON.stringify(packageJson, null, 2);
  }

  handleFileError(err) {
    if (err) {
      throw new Error(`Error reading file from disk: ${err}`);
    }
  }

  packageType() {
    const argvElement = process.argv[2];

    if (!argvElement) {
      throw new Error("Missing required argument!");
    }

    const [key, value] = argvElement.split("=");

    if (!value) {
      return key;
    }

    return value;
  }
}

new PackageRootUpdater().parsePackageJson();
