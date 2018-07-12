import * as chai from "chai";
import * as express from "express";
import * as supertest from "supertest";
import { Sample } from "../app/models/Sample.model";
import { JWTService } from "../app/services/Jwt.service";
import { SampleService } from "../app/services/Sample.service";
import { Server } from "../config/Server";

let token: string;
let IdRecord: number;
let IdRecordTwo: number;
const server: Server = new Server();
let app: express.Application;

describe("Sample route", () => {

    before((done) => {

        const sample = new Sample();
        sample.text = "SAMPLE TEXT";
        sample.email = "someone@somewhere.com";

        server.Start().then(() => {
            app = server.App();
            Promise.all([
                JWTService.signToken({name: "name", role: "rol"}),
                SampleService.Save(sample),
            ]).then((res) => {
                token = res[0];
                IdRecord = res[1].id;
                done();
            });
        });
    });

    after(async () => {
        const sampleOne = await SampleService.FindOneById(IdRecord);
        const sampleTwo = await SampleService.FindOneById(IdRecordTwo);
        if (sampleOne) {
            await SampleService.Remove(sampleOne);
        }
        if (sampleTwo) {
            await SampleService.Remove(sampleTwo);
        }
    });

    it("Random Url gives 404", (done) => {
        supertest(app).get("/random-url")
            .set("Authorization", `bearer ${token}`).set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.be.a("number");
                chai.expect(res.status).to.eq(404);
                done();
            });
    });

    it("Can list all Samples", (done) => {
        supertest(app).get("/")
            .set("Authorization", `bearer ${token}`).set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.be.a("number");
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.be.a("array");
                chai.expect(res.body[0].text).to.be.a("string");
                done();
            });
    });

    it("Can search for Sample by Id", (done) => {
        supertest(app).get(`/${IdRecord}`)
            .set("Authorization", `bearer ${token}`).set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.be.a("object");
                chai.expect(res.body).to.have.all.keys("id", "text", "email");
                chai.expect(res.body.text).to.be.a("string");
                done();
            });
    });

    it("Can create a new Sample", (done) => {
        supertest(app).post("/")
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({text: "Sample text 100"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(200);
                chai.expect(res.body).to.have.all.keys("id", "text", "email");
                chai.expect(res.body.id).to.be.a("number");
                chai.expect(res.body.text).to.be.a("string");
                IdRecordTwo = res.body.id;
                done();
            });
    });

    it("Can update an existing Sample", (done) => {
        supertest(app).put("/")
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({id: IdRecord, text: "Sample text updateado"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(200);
                done();
            });
    });

    it("Can remove a sample by Id", (done) => {
        supertest(app).delete("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({id: IdRecord})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(204);
                done();
            });
    });

    it("Reports an error when finding a non-existent Sample by Id", (done) => {
        supertest(app).get(`/9999`)
            .set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("NOT FOUND");
                done();
            });
    });

    it("Reports an error when trying to create an invalid Sample", (done) => {
        supertest(app).post("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({sample: "XXXX"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("ERROR");
                done();
            });
    });

    it("Reports an error when trying to update a Sample with invalid data", (done) => {
        supertest(app).put("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({sample: "XXXX"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                chai.expect(res.body).to.have.all.keys("text");
                chai.expect(res.body.text).to.be.a("string");
                chai.expect(res.body.text).to.equal("ERROR");
                done();
            });
    });

    it("Reports an error when trying to delete a Sample with invalid data", (done) => {
        supertest(app).delete("/").set("Authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .send({sample: "XXXX"})
            .end((err: Error, res: supertest.Response) => {
                chai.expect(res.status).to.eq(404);
                done();
            });
    });

});
