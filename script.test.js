var xlsx = require("xlsx");

var workbook = xlsx.readFile("Retail-Locations-2021_tg_kb.xlsx");

var worksheet = workbook.Sheets["Sheet 1 - Retail-Locations-Expo"]

var data = xlsx.utils.sheet_to_json(worksheet);

var missingAddress = [];
var hasAddress = [];

var missingUrls = [];
var hasUrls = [];

data.forEach((store) => {
    //  ADDRESS/LATITUDE CHECK
    if(store['Address 1']) {
        if(store['Address 1'].length > 0 || store.Latitude) {
            hasAddress.push(store)
        } else {
            missingAddress.push(store);
        }
    }
})

hasAddress.forEach((store) => {
    //  ADDRESS/LATITUDE CHECK
    if(store.URL) {
        if(store.URL.length > 0) {
            hasUrls.push(store)
        } else {
            missingUrls.push(store);
        }
    } else {
        missingUrls.push(store);
    }
})

// APPLY WEBSITE TO EACH STORE MISSING A WEBSITE
missingUrls.forEach((store) => {
    if(store.Title.includes("Safeway")) {
        store.URL = "https://www.safeway.com/"
    } else if(store.Title.includes("Quality Food Center")) {
        store.URL = "https://www.qfc.com/"
    } else if(store.Title.includes("Pick n Save")) {
        store.URL = "https://www.picknsave.com/"
    } else if(store.Title.includes("Payless Super Market")) {
        store.URL = "https://www.pay-less.com/"
    } else if(store.Title.includes("Metro Market")) {
        store.URL = "https://www.metromarket.net/"
    } else if(store.Title.includes("Market Street")) {
        store.URL = "https://local.marketstreetunited.com/"
    } else if(store.Title.includes("Marianos")) {
        store.URL = "https://www.marianos.com/"
    } else if(store.Title.includes("Jay C")) {
        store.URL = "https://www.jaycfoods.com/"
    } else if(store.Title.includes("Gerbes")) {
        store.URL = "https://www.gerbes.com/"
    } else if(store.Title.includes("Foodsco")) {
        store.URL = "https://www.foodsco.net/"
    } else if(store.Title.includes("Eagle Quality Center")) {
        store.URL = "no-website"
    } else if(store.Title.includes("City Market")) {
        store.URL = "https://www.citymarket.com/"
    } else if(store.Title.includes("Carrs Quality Center")) {
        store.URL = "https://www.carrsqc.com/"
    } else if(store.Title.includes("Baker's")) {
        store.URL = "https://www.bakersplus.com/"
    } else if(store.Title.includes("Albertsons")) {
        store.URL = "https://www.albertsons.com/"
    }
})

var newMissingUrls = [];

missingUrls.forEach((store) => {
    //  ADDRESS/LATITUDE CHECK
    if(store.URL) {
        if(store.URL.length > 0) {
            hasUrls.push(store)
        } else {
            newMissingUrls.push(store);
        }
    } else {
        newMissingUrls.push(store);
    }
})

// These URL's weren't URL's. They were just some text about the store.
hasUrls.forEach((store) => {
    if(store.Title.includes("Martin's Food Market")) {
        store.URL = "https://www.martinsfoods.com/"
    } else if(store.Title.includes("Hannaford")) {
        store.URL = "https://www.hannaford.com/"
    } 
})


test('original file has 11094 stores', () => {
    expect(data.length).toEqual(11093);
  });
test('make sure there are no URLs in newMissingUrls array', () => {
    const tempArr = [];
    newMissingUrls.forEach((store) => {
        if(store.URL) {
            tempArr.push(store)
        }
    })
    expect(tempArr.length).toEqual(0);
  });
test('make sure there are no empty URLs in the hasUrls array', () => {
    const tempArr = [];
    hasUrls.forEach((store) => {
        if(!store.URL) {
            tempArr.push(store)
        }
    })
    expect(tempArr.length).toEqual(0);
  });
test('make sure there are no empty stores in the hasAddress array', () => {
    const tempArr = [];
    hasAddress.forEach((store) => {
        // console.log(store)
        if(!store['Address 1'] && !store.Latitude) {
            console.log(store['Address 1'].length)
            // console.log(store.Latitude)
            tempArr.push(store)
        }
    })
    console.log('hasAddress.length: ', hasAddress.length)
    expect(tempArr.length).toEqual(0);
  });
test('make sure there are no completed stores in the missingAddress array', () => {
    const tempArr = [];
    missingAddress.forEach((store) => {
        // console.log(store)
        if(store['Address 1'] || store.Latitude) {
            tempArr.push(store)
        }
    })
    expect(tempArr.length).toEqual(0);
  });

  test('make sure there are no empty URLs in the newMissingUrls array', () => {
    expect(newMissingUrls.length).toEqual(0);
  });

  test('make sure hasUrls array is the same length as hasAddress Array', () => {
    expect(hasUrls.length).toEqual(hasAddress.length);
  });
