import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from "bcrypt";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({name:'first_name'})
    FirstName: string;
    @Column({name:'last_name'})
    LastName: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @DeleteDateColumn()
    delete_at: Date;
    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }
}

