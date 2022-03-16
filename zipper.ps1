echo "Zipping folders, did you remember to bump the version in the manifest?`n"
foreach ($folder in Get-ChildItem -Directory) {
    Compress-Archive -Path "$folder\*" -DestinationPath "$folder.zip" -Force
    echo "$folder.zip"
}

echo ""