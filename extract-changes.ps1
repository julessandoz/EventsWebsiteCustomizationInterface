# Define the commit from which you want to compare
$commit = "9d099f6"

# The directory of your Git repository
# Might look like this on Windows: "C:\Users\jules\Documents\GitHub\BachelorsProject"
# Might look like this on Mac or Linux: "/Users/julessandoz/Documents/GitHub/BachelorsProject"
$sourceDirectory = "/Users/julessandoz/Library/CloudStorage/Dropbox/HEIG-VD/TravailBachelor/BachelorsProject"

# The directory where you want to copy the modified files
# Might look like this on Windows: "C:\Users\jules\Documents\GitHub\BachelorsProject\export"
# Might look like this on Mac or Linux: "/Users/julessandoz/Documents/GitHub/BachelorsProject/export"
# You can also give the directory to the Events Management Website you want to update and the files will go in the correct spot and overwrite the old ones automatically.
$destinationDirectory = "/Users/julessandoz/Downloads/release"

# Get the list of changed files since the specified commit
$changedFiles = git diff --name-only $commit HEAD

# Go through each file in the list
foreach ($file in $changedFiles) {
    # Create the full source path
    $sourcePath = Join-Path -Path $sourceDirectory -ChildPath $file
    
    # Create the full destination path
    $destinationPath = Join-Path -Path $destinationDirectory -ChildPath $file
    
    # Check if the destination directory exists, if not create it
    $destinationDir = Split-Path -Path $destinationPath -Parent
    if (!(Test-Path -Path $destinationDir)) {
        New-Item -ItemType Directory -Force -Path $destinationDir
    }

    # Copy the file to the new location
    if (Test-Path -Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destinationPath
    }
}
