foreach($file in Get-ChildItem -Directory)

{

Compress-Archive -Path "$file\*" -DestinationPath "$file.zip" -Force

}