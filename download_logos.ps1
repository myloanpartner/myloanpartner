$logos = @{
    "hdfc-bank" = "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg"
    "icici-bank" = "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg"
    "axis-bank" = "https://upload.wikimedia.org/wikipedia/commons/3/30/Axis_Bank_logo.svg"
    "sbi" = "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg"
    "kotak-bank" = "https://upload.wikimedia.org/wikipedia/commons/6/6d/Kotak_Mahindra_Bank_logo.svg"
    "bajaj-finserv" = "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bajaj_Finserv_Logo.svg"
    "tata-capital" = "https://upload.wikimedia.org/wikipedia/commons/2/23/Tata_Capital_Logo.svg"
    "aditya-birla" = "https://upload.wikimedia.org/wikipedia/commons/a/a2/Aditya_Birla_Capital_Logo.svg"
    "idfc-first" = "https://upload.wikimedia.org/wikipedia/commons/8/82/IDFC_First_Bank_logo.svg"
    "yes-bank" = "https://upload.wikimedia.org/wikipedia/commons/f/f8/Yes_Bank_Logo.svg"
    "indusind-bank" = "https://upload.wikimedia.org/wikipedia/commons/a/a3/IndusInd_Bank_Logo.svg"
    "lt-finance" = "https://upload.wikimedia.org/wikipedia/commons/3/3d/L%26T_Finance_Holdings_Logo.svg"
    "piramal-finance" = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Piramal_Group_Logo.svg"
    "muthoot-finance" = "https://upload.wikimedia.org/wikipedia/commons/3/3e/Muthoot_Finance_Logo.svg"
    "fullerton-india" = "https://upload.wikimedia.org/wikipedia/commons/7/7b/Fullerton_India_Logo.jpg"
    "hero-fincorp" = "https://upload.wikimedia.org/wikipedia/en/5/59/Hero_FinCorp_Logo.svg"
}

$dest = "src/assets/partners"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest }

foreach ($name in $logos.Keys) {
    $url = $logos[$name]
    $ext = [System.IO.Path]::GetExtension($url)
    if ($ext -eq "") { $ext = ".svg" }
    $output = Join-Path $dest "$name$ext"
    
    Write-Host "Downloading $name from $url..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -UserAgent "Mozilla/5.0"
        Write-Host "Success."
    } catch {
        Write-Host "Failed to download $name : $_"
    }
}
