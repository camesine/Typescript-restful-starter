"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const chai = require("chai");
const JWTService_1 = require("../app/services/JWTService");
const SampleService_1 = require("../app/services/SampleService");
const SampleRepository_1 = require("../app/repository/SampleRepository");
const typeorm_1 = require("typeorm");
const Connection_1 = require("../config/db/Connection");
const Sample_1 = require("../app/entity/Sample");
const request = require("superagent");
const URI = 'http://127.0.0.1:' + config_1.config.PORT;
let token = null;
let IdRecord = null;
let IdRecordTwo = null;
describe('ALL ', () => {
    before((done) => {
        const sample = new Sample_1.Sample();
        sample.text = "SAMPLE TEXT";
        Connection_1.Connection.then(conn => {
            const JWTAccess = new JWTService_1.JWTService();
            const SampleAccess = new SampleService_1.SampleService();
            Promise.all([
                JWTAccess.signToken({ name: 'name', role: 'rol' }),
                typeorm_1.getCustomRepository(SampleRepository_1.SampleRepository).save(sample)
            ]).then((res) => {
                token = res[0];
                IdRecord = res[1].id;
                done();
            });
        });
    });
    after((done) => {
        Promise.all([
            typeorm_1.getCustomRepository(SampleRepository_1.SampleRepository).deleteById(IdRecord),
            typeorm_1.getCustomRepository(SampleRepository_1.SampleRepository).deleteById(IdRecordTwo),
        ]).then(() => done());
    });
    it('SAMPLE CONTROLLER GET FIND ALL', (done) => {
        request.get(URI)
            .set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
            .end((err, res) => {
            chai.expect(res.status).to.be.a('number');
            chai.expect(res.status).to.eq(200);
            chai.expect(res.body).to.be.a('array');
            chai.expect(res.body[0].text).to.be.a('string');
            done();
        });
    });
    it('SAMPLE CONTROLLER GET FIND ONE', (done) => {
        request.get(`${URI}/${IdRecord}`)
            .set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
            .end((err, res) => {
            chai.expect(res.status).to.eq(200);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.all.keys('id', 'text');
            chai.expect(res.body.text).to.be.a('string');
            done();
        });
    });
    /*
        it('SAMPLE CONTROLLER POST CREATE', (done) => {
            const sample: ISampleAttribute = { text: 'Sample text 100' }
            request.post(URI).set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
            .send({ sample })
            .end((err, res) => {
                chai.expect(res.status).to.eq(200)
                chai.expect(res.body).to.have.all.keys('id', 'text')
                chai.expect(res.body.id).to.be.a('number')
                chai.expect(res.body.text).to.be.a('string')
                IdRecordTwo = res.body.id
                done()
            })
    
        })
    
        it('SAMPLE CONTROLLER PUT UPDATE', (done) => {
            const sample: ISampleAttribute = { id: IdRecord, text: 'Sample text updateado' }
            request.put(URI).set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
            .send({ sample })
            .end((err, res) => {
                chai.expect(res.status).to.eq(200)
                chai.expect(res.body[0]).to.be.a('number')
                done()
            })
        })
    
        it('SAMPLE CONTROLLER DELETE REMOVE', (done) => {
            const sample: ISampleAttribute = { id: IdRecord }
            request.delete(URI).set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
            .send({ sample })
            .end((err, res) => {
                chai.expect(res.status).to.eq(204)
                done()
            })
        })
    
        it('SAMPLE CONTROLLER GET NOT FIND ONE', (done) => {
            request.get(`${URI}/XXXX`)
            .set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
            .end((err, res) => {
                chai.expect(res.status).to.eq(404)
                chai.expect(res.body).to.have.all.keys('text')
                chai.expect(res.body.text).to.be.a('string')
                chai.expect(res.body.text).to.equal('NOT FOUND')
                done()
            })
        })
     
        it('SAMPLE CONTROLLER ERROR POST CREATE', (done) => {
            request.post(URI).set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
            .send({ sample: 'XXXX' })
            .end((err, res) => {
                chai.expect(res.status).to.eq(404)
                chai.expect(res.body).to.have.all.keys('text')
                chai.expect(res.body.text).to.be.a('string')
                chai.expect(res.body.text).to.equal('ERROR')
                done()
            })
        })
    
        it('SAMPLE CONTROLLER ERROR PUT UPDATE', (done) => {
            request.put(URI).set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
            .send({ sample: 'XXXX' })
            .end((err, res) => {
                chai.expect(res.status).to.eq(404)
                chai.expect(res.body).to.have.all.keys('text')
                chai.expect(res.body.text).to.be.a('string')
                chai.expect(res.body.text).to.equal('ERROR')
                done()
            })
        })
    
        it('SAMPLE CONTROLLER ERROR DELETE REMOVE', (done) => {
            request.delete(URI).set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
            .send({ sample: 'XXXX' })
            .end((err, res) => {
                chai.expect(res.status).to.eq(404)
                done()
            })
        })
    */
});
//# sourceMappingURL=TestRouter.js.map