import { config } from '../config'
import * as chai from 'chai'
import { JWTService } from '../app/services/JWTService'
import { SampleService } from '../app/services/SampleService'
import { SampleRepository } from '../app/repository/SampleRepository'
import { getCustomRepository } from 'typeorm'
import { Connection } from '../config/Database'
import { Sample } from '../app/entity/Sample'
import * as request from 'superagent'

const URI: string = 'http://127.0.0.1:' + config.PORT
let token: string = null
let IdRecord: number = null
let IdRecordTwo: number = null

describe('ALL ', () => {

    before((done) => {

        let sample = new Sample()
        sample.text = "SAMPLE TEXT"

        Connection.then(conn => {

            const SampleAccess: SampleService = new SampleService()

            Promise.all([
                JWTService.signToken({ name: 'name', role: 'rol' }),
                getCustomRepository(SampleRepository).save(sample)
            ]).then((res) => {
                token = res[0]
                IdRecord = res[1].id
                done()
            })
        })    
    })

    after((done) => {
        Promise.all([
            getCustomRepository(SampleRepository).deleteById(IdRecord),
            getCustomRepository(SampleRepository).deleteById(IdRecordTwo),
        ]).then(() => done())
    })

    it('SAMPLE CONTROLLER GET FIND ALL', (done) => {
        request.get(URI)
        .set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
        .end((err, res) => {
            chai.expect(res.status).to.be.a('number')
            chai.expect(res.status).to.eq(200)
            chai.expect(res.body).to.be.a('array')
            chai.expect(res.body[0].text).to.be.a('string')
            done()
        })
     
    })

    it('SAMPLE CONTROLLER GET FIND ONE', (done) => {
        request.get(`${URI}/${IdRecord}`)
        .set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
        .end((err, res) => {
            chai.expect(res.status).to.eq(200)
            chai.expect(res.body).to.be.a('object')
            chai.expect(res.body).to.have.all.keys('id', 'text')
            chai.expect(res.body.text).to.be.a('string') 
            done()
        })
     
    })


    it('SAMPLE CONTROLLER POST CREATE', (done) => {
        request.post(URI).set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
        .send({ text: 'Sample text 100' })
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
        request.put(URI).set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
        .send({ id: IdRecord, text: 'Sample text updateado' })
        .end((err, res) => {
            chai.expect(res.status).to.eq(200)
            done()
        })
    })

    it('SAMPLE CONTROLLER DELETE REMOVE', (done) => {
        request.delete(URI).set('Authorization', `bearer ${token}`).set('Accept', 'application/json')
        .send({ id: IdRecord })
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

})
