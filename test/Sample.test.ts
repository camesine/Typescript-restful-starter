import * as chai from "chai";
import * as request from "supertest";
import * as express from "express";
import {getCustomRepository} from "typeorm";
import {Sample} from "../app/models/Sample.model";
import {SampleRepository} from "../app/repository/Sample.repository";
import {JWTService} from "../app/services/Jwt.service";
import {SampleService} from "../app/services/Sample.service";
import {config} from "../config";
import {Connection} from "../config/Database";
import {Server} from "../config/Server";

let token: string = null;
let IdRecord: number = null;
let IdRecordTwo: number = null;
const server: Server = new Server();
let app: express.Application = null;

describe("ALL TEST ROUTE", () => {

    before((done) => {

        const sample = new Sample();
        sample.text = "SAMPLE TEXT";
        sample.email = "someone@somewhere.com";

        server.Start().then(() => {
            app = server.App();
            const SampleAccess: SampleService = new SampleService();
            Promise.all([
                JWTService.signToken({name: "name", role: "rol"}),
                getCustomRepository(SampleRepository).save(sample),
            ]).then((res) => {
                token = res[0];
                IdRecord = res[1].id;
                done();
            });
        });
    });

    after(async () => {
        const sampleOne = await getCustomRepository(SampleRepository).findOne({id: IdRecord});
        const sampleTwo = await getCustomRepository(SampleRepository).findOne({id: IdRecordTwo});
        if (sampleOne) {
            await getCustomRepository(SampleRepository).delete(sampleOne);
        }
        if (sampleTwo) {
            await getCustomRepository(SampleRepository).delete(sampleTwo);
        }
    });

    it("SAMPLE CONTROLLER GET FIND ALL", (done) => {
        request(app).get("/")
            .set("Authorization", `bearer ${token}`).set("Accept", "application/json")
            .end((err, res) => {
                chai.expect(res.status).to.be.a("number");
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.be.a("array");
                chai.expect(res.body[0].text).to.be.a("string");
                done();
            });
    });

    it("SAMPLE CONTROLLER GET FIND ONE", (done) => {
        request(app).get(`/${IdRecord}`)
            .set("Authorization", `bearer ${token}`).set("Accept", "application/json")
            .end((err, res) => {
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.be.a("object");
                chai.expect(res.body).to.have.all.keys("id", "text", "email");
                chai.expect(res.body.text).to.be.a("string");
                done();
            });
    });

    it("SAMPLE CONTROLLER POST CREATE", (done) => {
        request(app).post("/")
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({text: "Sample text 100"})
            .end((err, res) => {
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.have.all.keys("id", "text", "email");
                chai.expect(res.body.id).to.be.a("number");
                chai.expect(res.body.text).to.be.a("string");
                IdRecordTwo = res.body.id;
                done();
            });
    });

    it("SAMPLE CONTROLLER PUT UPDATE", (done) => {
        request(app).put("/")
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({id: IdRecord, text: "Sample text updateado"})
            .end((err, res) => {
                chai.expect(res.status).to.eq(200);
                done();
            });
    });

    it("SAMPLE CONTROLLER DELETE REMOVE", (done) => {
        request(app).delete("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({id: IdRecord})
            .end((err, res) => {
                chai.expect(res.status).to.eq(204);
                done();
            });
    });

    it("SAMPLE CONTROLLER GET NOT FIND ONE", (done) => {
        request(app).get(`/9999`)
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("NOT FOUND");
                done();
            });
    });

    it("SAMPLE CONTROLLER ERROR POST CREATE", (done) => {
        request(app).post("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({sample: "XXXX"})
            .end((err, res) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("ERROR");
                done();
            });
    });

    it("SAMPLE CONTROLLER ERROR PUT UPDATE", (done) => {
        request(app).put("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({sample: "XXXX"})
            .end((err, res) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("ERROR");
                done();
            });
    });

    it("SAMPLE CONTROLLER ERROR DELETE REMOVE", (done) => {
        request(app).delete("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({sample: "XXXX"})
            .end((err, res) => {
                chai.expect(res.status).to.eq(404);
                done();
            });
    });

});

