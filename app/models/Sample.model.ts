import {IsEmail} from "class-validator";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("sample")
export class Sample extends BaseEntity {

    public static FindByText(text: string): Promise<Sample[]> {
        return this.find({where: {text}});
    }

    public static findOneById(id: number): Promise<Sample> {
        return this.findOne({where: {id}});
    }

    public static async removeById(id: number) {
        const itemToRemove = await this.findOneById(id);
        return this.remove(itemToRemove);
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column("text")
    public text: string;

    @Column("text")
    @IsEmail()
    public email: string;


}
