const Company = require('../index'),
    ads = require('../ads'),
    chai = require("chai"),
    should = chai.should();


describe('Company', function () {

    var companyName = 'Ford';
    var companyA = new Company(companyName, 5, 4, 309.99, 389.99, 3);

    it('should create correctly', function () {

        should.exist(companyA.name);
        should.exist(companyA.items)
        companyA.items.should.eql([]);
    })

    it('should add the items array', function () {
        var adsName = 'classic';
        var adClassic = new ads(adsName);

        companyA.addItem(adClassic);

        companyA.items.length.should.equal(1);
        companyA.items[0].name.should.equal(adsName);
    });
})