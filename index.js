'use strict';

const ads = require('./ads');

var adClassic = new ads.Ads('classic');
var adStandout = new ads.Ads('standout');
var adPremium = new ads.Ads('premium');

const classicUnitPrice = 269.99;
const standoutUnitPrice = 322.99;
const premiumUnitPrice = 394.99;

var Company = function (name, classicGet, classicFor, standoutPriceDiscount, premiumPriceDiscount, premiumWhen) {
    this.name = name;
    this.items = [];

    this.classicGet = classicGet;
    this.classicFor = classicFor;

    this.standoutPriceDiscount = standoutPriceDiscount;

    this.premiumPriceDiscount = premiumPriceDiscount;
    this.premiumWhen = premiumWhen;
}

var companyFord = new Company('Ford', 5, 4, 309.99, 389.99, 3);

Company.prototype.addItem = function (item) {

    this.items.push(item);
};

Company.prototype.getTotalCountForAnAds = function (adsName) {
    var count = 0;

    if (this.items)
    {
        count = this.items.reduce(function (n, item) {
            return n + (item.name === adsName);
        }, 0);
    }   

    return count; 
}

Company.prototype.getClassicPriceTotal = function (count) {
    if (count > 0) {
        if (this.classicGet && this.classicFor && this.classicGet > 0 && this.classicFor > 0) {
            if (this.classicGet > 0 && this.classicFor > 0) {
                return Math.ceil(count / this.classicGet * this.classicFor) * classicUnitPrice;
            } else {
                return count * classicUnitPrice;
            }
        } else {
            return count * classicUnitPrice;
        }
    }
    else
    {
        return 0
    }
}

Company.prototype.getClassicTotal = function () {
    if (this.items) {
        // get classic count
        var countClassic = this.getTotalCountForAnAds('classic');

        // get classic price
        return this.getClassicPriceTotal(countClassic);
    }
}

Company.prototype.getStandOutPriceTotal = function (count) {
    if (count > 0) {
        if (this.standoutPriceDiscount) {
            if (this.standoutPriceDiscount > 0) {
                return count * this.standoutPriceDiscount;
            } else {
                return count * standoutUnitPrice;
            }
        } else {
            return count * standoutUnitPrice;
        }
    }
    else
    {
        return 0
    }
}

Company.prototype.getStandoutTotal = function () {
    if (this.items) {

        // get standout count
        var countStandout = this.getTotalCountForAnAds('standout');
        return this.getStandOutPriceTotal(countStandout);
    }
}

Company.prototype.getPremiumPriceTotal = function (count) {
    if (count > 0) {
        if (this.premiumPriceDiscount && this.premiumWhen) {
            if (count >= this.premiumWhen) {
                return count * this.premiumPriceDiscount
            } else {
                return count * premiumUnitPrice
            }
        } else {
            return count * premiumUnitPrice
        };
    }
    else
    {
        return 0
    }   
}

Company.prototype.getPremiumTotal = function () {
    if (this.items) {

        // get premium count
        var countPremium = this.getTotalCountForAnAds('premium');

        // get premium price
        return this.getPremiumPriceTotal(countPremium); 
    }    
}

Company.prototype.total = function () {

    if (this.items) {

        var classicPrice = this.getClassicTotal();
        var standoutPrice = this.getStandoutTotal();
        var premiumPrice = this.getPremiumTotal();

        console.log('Checkout for', this.name, 'Classic Total:', classicPrice, 'StandOut Total:', standoutPrice, 'Premium Total:', premiumPrice,
            'Grand Total:', classicPrice + standoutPrice + premiumPrice);
    }
}

// default
var companyDefault = new Company('Default');
companyDefault.addItem(adClassic);
companyDefault.addItem(adStandout);
companyDefault.addItem(adPremium);
companyDefault.total();

// unilever
var companyUnilever = new Company('Unilever', 3, 2);
companyUnilever.addItem(adClassic);
companyUnilever.addItem(adClassic);
companyUnilever.addItem(adClassic);
companyUnilever.addItem(adPremium);
companyUnilever.total();

// apple
var companyApple = new Company('Apple', 0, 0, 299.99);
companyApple.addItem(adStandout);
companyApple.addItem(adStandout);
companyApple.addItem(adStandout);
companyApple.addItem(adPremium);
companyApple.total();

// nike
var companyNike = new Company('Nike', 0, 0, 0, 379.99, 4);
companyNike.addItem(adPremium);
companyNike.addItem(adPremium);
companyNike.addItem(adPremium);
companyNike.addItem(adPremium);
companyNike.total();

// ford
var companyFord = new Company('Ford', 5, 4, 309.99, 389.99, 3);
companyFord.addItem(adPremium);
companyFord.addItem(adPremium);
companyFord.addItem(adPremium);
companyFord.addItem(adPremium);
companyFord.addItem(adStandout);
companyFord.addItem(adClassic);
companyFord.addItem(adClassic);
companyFord.addItem(adClassic);
companyFord.addItem(adClassic);
companyFord.addItem(adClassic);
companyFord.addItem(adClassic);
companyFord.total();

