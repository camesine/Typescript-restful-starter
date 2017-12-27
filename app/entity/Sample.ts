import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm'

@Entity('sample')
export class Sample extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column('text')
    public text: string

    public static FindByText(text: string): Promise<Sample[]> {
        return this.find({ where: { text } })
    }

}
