import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sample")
export class Sample extends BaseEntity {

  public static FindByText(text: string): Promise<Sample[]> {
    return this.find({ where: { text } });
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text")
  public text: string;

}
