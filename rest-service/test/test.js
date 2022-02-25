import chai from "chai";
import * as api from "../api/api.js";
import sinon from "sinon";
const expect = chai.expect;

describe("Testing Calculate Net Worth", () => {
    const res = {
        status: function(statusCode) {
            this.statusCode = statusCode;
            return this;
        },
        json: function(data) {
            this.data = data
            return this;
        },
        send: function(msg) {
            this.msg = msg;
            return this;
        }
    }

    it("Should get 200", (done) => {
        const req = {
            body: {
                assets: [{
                    fundType : "Cash and Investments",
                    fund : [
                      {name:"Chequing", amount: 2000},
                      {name:"Savings for Taxes", amount: 4000},
                      {name:"Rainy Day Fund", amount: 506},
                      {name:"Savings for Fun", amount: 5000},
                      {name:"Savings for Travel", amount: 400},
                      {name:"Savings for Personal Development", amount: 200},
                      {name:"Investment 1", amount: 5000},
                      {name:"Investment 2", amount: 60000},
                      {name:"Investment 3", amount: 24000}
                    ]
                  },
                  {
                    fundType: "Long Term Assets",
                    fund: [
                      {name:"Primary Home", amount: 455000},
                      {name:"Second Home", amount: 1564321},
                      {name:"Other", amount: 0},
                    ]
                  }
                ],
                liabilities: [
                    {
                        fundType: "Short Term Liabilities",
                        fund: [
                        {name:"Credit Card 1", amount: 4342},
                        {name:"Credit Card 2", amount: 322}
                        ]
                    },
                    {
                        fundType: "Long Term Debt",
                        fund: [
                        {name:"Mortgage 1", amount: 250999},
                        {name:"Mortgage 2", amount: 632634},
                        {name:"Line of Credit", amount: 10000},
                        {name:"Investment Loan", amount: 10000},
                        ]
                    }
                ]   
            }
        }

        api.calculateNetworth(req, res)
            .then(() => {
                let data = res.data;
                expect(res.statusCode).to.be.equal(200);
                expect(data.asset).to.be.equal(2120427);
                expect(data.liability).to.be.equal(908297);
                expect(data.networth).to.be.equal(1212130);
                done();
            })
            .catch(done)
    })

    it("Should get 400", (done) => {
        const req = {
            body: {}
        }

        api.calculateNetworth(req, res)
            .then(() => {
                expect(res.statusCode).to.be.equal(400);
                expect(res.msg).to.be.equal("Invalid data");
                done()
            })
            .catch(done)
    })

    // it("Should get 500", (done) => {
    //     done()
    // })
})

describe("Testing Calculate Net Worth With Currency", () => {
    const res = {
        status: function(statusCode) {
            this.statusCode = statusCode;
            return this;
        },
        json: function(data) {
            this.data = data
            return this;
        },
        send: function(msg) {
            this.msg = msg;
            return this;
        }
    }

    it("Should get 200", (done) => {
        // sinon.stub(api, "getConversion");
        // api.getConversion.withArgs("CAD","USD")
        //     .resolves(1.3)
        const req = {
            body: {
                liabilities: [
                    {
                        fundType: "test liability",
                        fund: [
                            {name: "liability1", amount: 100},
                            {name: "liability3", amount: 200},
                            {name: "liability3", amount: 300}
                        ]
                    }
                ],
                assets: [
                    {
                        fundType: "test asset",
                        fund: [
                            {name: "asset1", amount: 100},
                            {name: "asset3", amount: 200},
                            {name: "asset3", amount: 300}
                        ]
                    }
                ],
                currency: "USD",
                prevCurrency: "CAD", 
            }
        }

        api.getConversion(req.body.prevCurrency, req.body.currency)
            .then((conversion) => {
                api.calculateNetworthWithCurrency(req, res)
                .then(() => {
                    let data = res.data;
                    expect(res.statusCode).to.be.equal(200);
                    expect(data.asset).to.be.equal(600 * conversion);
                    expect(data.liability).to.be.equal(600 * conversion);
                    expect(data.networth).to.be.equal(0);
                    done()
                })  
                done()
            })
    })

    it("Should get 400", (done) => {
        const req = {
            body: {}
        }

        api.calculateNetworthWithCurrency(req, res)
            .then(() => {
                expect(res.statusCode).to.be.equal(400);
                expect(res.msg).to.be.equal("Invalid data");
                done()
            })
            .catch(done)
    })

    // it("Should get 500", (done) => {
    //     done()
    // })
})