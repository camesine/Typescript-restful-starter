import { config } from '../config'
import * as chai from 'chai'
import { JWTService } from '../app/services/JWTService'
import { SampleService } from '../app/services/SampleService'
import * as request from 'superagent'
import { ISampleAttribute } from '../app/models/Sample'

const URI: string = 'http://127.0.0.1:' + config.PORT
const JWTAccess: JWTService = new JWTService()
const SampleAccess: SampleService = new SampleService()
let token: string = null
let IdRecord: number = null
let IdRecordTwo: number = null

describe('ALL ', () => {

    before((done) => {

        Promise.all([
            JWTAccess.signToken({ name: 'name', role: 'rol' }),
            SampleAccess.create({ text: "SAMPLE TEXT" })
        ]).then((res) => {
            token = res[0]
            IdRecord = res[1].id
            done()
        })
    
    })

    after((done) => {
        Promise.all([
            SampleAccess.delete({ id: IdRecord }),
            SampleAccess.delete({ id: IdRecordTwo })
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

   
})
