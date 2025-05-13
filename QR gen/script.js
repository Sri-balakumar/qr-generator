// Initialize variables
let qrcode = null;
let currentText = '';
let currentColor = '#000000';
let currentSize = '300';
let currentLanguage = 'en'; // Track current language

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('change', function() {
  document.body.classList.toggle('dark-mode');
  updateModeLabel();
  
  // Regenerate QR code if it exists when theme changes
  if (qrcode && currentText) {
    regenerateQRCode();
  }
});

// Check if dark mode is saved in local storage
document.addEventListener('DOMContentLoaded', function() {
  // Handle GitHub QR Code
  new QRCode(document.getElementById('githubQR'), {
    text: 'https://github.com/Sri-balakumar',
    width: 120,
    height: 120,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
  
  // Load saved language preference if any
  const savedLanguage = localStorage.getItem('language') || 'en';
  currentLanguage = savedLanguage;
  document.getElementById('languageSelect').value = savedLanguage;
  
  // Set the language attribute on html tag for CSS targeting
  document.documentElement.setAttribute('lang', savedLanguage);
  
  // Check and apply saved dark mode setting
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').checked = true;
  }
  
  // Initialize language with proper mode label
  updateLanguage(savedLanguage);
});

function updateModeLabel() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  if (darkModeToggle.checked) {
    localStorage.setItem('darkMode', 'true');
  } else {
    localStorage.setItem('darkMode', 'false');
  }
  
  // Update the mode label according to current language
  updateLanguage(currentLanguage);
}

// QR code generation
function generateQRCode() {
  currentText = document.getElementById('text').value;
  currentColor = document.getElementById('qrColor').value;
  currentSize = document.getElementById('qrSize').value;
  
  if (currentText) {
    createQRCode();
  }
}

// Creates the QR code with current settings
function createQRCode() {
  // Clear previous QR code
  document.getElementById('qrcode').innerHTML = '';
  
  // Initialize QR code
  qrcode = new QRCode(document.getElementById('qrcode'), {
    text: currentText,
    width: parseInt(currentSize),
    height: parseInt(currentSize),
    colorDark: currentColor,
    colorLight: '#ffffff', // Always white background
    correctLevel: QRCode.CorrectLevel.H
  });
  
  // Add explicit white background to QR container
  const qrContainer = document.getElementById('qrcode');
  qrContainer.style.backgroundColor = '#ffffff';
  
  // Enable download and share buttons
  document.getElementById('downloadBtn').disabled = false;
  document.getElementById('shareBtn').disabled = false;
}

// Regenerate QR code with saved settings
function regenerateQRCode() {
  if (currentText) {
    createQRCode();
  }
}

// Download function
function downloadPNG() {
  if (qrcode) {
    const qrCanvas = document.querySelector('#qrcode canvas');
    if (qrCanvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCanvas.toDataURL('image/png');
      link.click();
    }
  }
}

// Share function
document.getElementById('shareBtn').addEventListener('click', async function() {
  if (!qrcode) return;
  
  // Get the canvas and convert to blob for sharing
  const qrCanvas = document.querySelector('#qrcode canvas');
  if (!qrCanvas) return;
  
  try {
    // Convert canvas to blob
    const blob = await new Promise(resolve => {
      qrCanvas.toBlob(resolve, 'image/png');
    });
    
    // Check if Web Share API is available
    if (navigator.share) {
      await navigator.share({
        title: 'QR Code',
        text: 'Check out this QR code!',
        files: [new File([blob], 'qrcode.png', { type: 'image/png' })]
      });
    } else {
      alert('Sharing is not available on your device');
    }
  } catch (error) {
    console.error('Error sharing:', error);
  }
});

// Language translation functionality
document.getElementById('languageSelect').addEventListener('change', function() {
  const lang = this.value;
  currentLanguage = lang;
  updateLanguage(lang);
});

function updateLanguage(lang) {
  // Store the language globally
  currentLanguage = lang;
  
  // Update html lang attribute for CSS targeting
  document.documentElement.setAttribute('lang', lang);
  
  const translations = {
    'en': {
      'title': 'QR Code Generator',
      'subtitle': 'Enter text or URL to generate a QR code',
      'colorLabel': 'QR Code Color:',
      'sizeLabel': 'QR Code Size:',
      'sizeSmall': 'Small (100x100)',
      'sizeMedium': 'Medium (200x200)',
      'sizeLarge': 'Large (300x300)',
      'sizeXLarge': 'Extra Large (400x400)',
      'generateBtn': '<i class="fas fa-qrcode"></i> Generate QR Code',
      'downloadBtn': '<i class="fas fa-download"></i> Download PNG',
      'shareBtn': '<i class="fas fa-share-alt"></i> Share QR Code',
      'lightMode': 'Light Mode',
      'darkMode': 'Dark Mode'
    },
    'ta': {
      'title': 'QR குறியீடு உருவாக்கி',
      'subtitle': 'QR குறியீட்டை உருவாக்க உரை அல்லது URL ஐ உள்ளிடவும்',
      'colorLabel': 'QR குறியீடு நிறம்:',
      'sizeLabel': 'QR குறியீடு அளவு:',
      'sizeSmall': 'சிறியது (100x100)',
      'sizeMedium': 'நடுத்தரம் (200x200)',
      'sizeLarge': 'பெரியது (300x300)',
      'sizeXLarge': 'மிகப்பெரியது (400x400)',
      'generateBtn': '<i class="fas fa-qrcode"></i> QR குறியீடு உருவாக்கு',
      'downloadBtn': '<i class="fas fa-download"></i> PNG பதிவிறக்கம்',
      'shareBtn': '<i class="fas fa-share-alt"></i> QR குறியீட்டை பகிர்',
      'lightMode': 'வெளிச்ச பயன்முறை',
      'darkMode': 'இருள் பயன்முறை'
    }
  };
  
  // Update all text elements
  document.getElementById('title').textContent = translations[lang].title;
  document.getElementById('subtitle').textContent = translations[lang].subtitle;
  document.getElementById('colorLabel').textContent = translations[lang].colorLabel;
  document.getElementById('sizeLabel').textContent = translations[lang].sizeLabel;
  document.getElementById('sizeSmall').textContent = translations[lang].sizeSmall;
  document.getElementById('sizeMedium').textContent = translations[lang].sizeMedium;
  document.getElementById('sizeLarge').textContent = translations[lang].sizeLarge;
  document.getElementById('sizeXLarge').textContent = translations[lang].sizeXLarge;
  document.getElementById('generateBtn').innerHTML = translations[lang].generateBtn;
  document.getElementById('downloadBtn').innerHTML = translations[lang].downloadBtn;
  document.getElementById('shareBtn').innerHTML = translations[lang].shareBtn;
  
  // Update mode label based on current toggle state
  const darkModeToggle = document.getElementById('darkModeToggle');
  const modeLabel = document.getElementById('modeLabel');
  
  if (darkModeToggle.checked) {
    modeLabel.textContent = translations[lang].lightMode;
  } else {
    modeLabel.textContent = translations[lang].darkMode;
  }
  
  // Save language preference
  localStorage.setItem('language', lang);
}