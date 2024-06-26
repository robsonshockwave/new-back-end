import { Entity } from '@/core/entities/entities';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  // a classe Entity já está fazendo isso
  //   constructor(props: StudentProps, id?: string) {
  //     super(props, id);
  //   }

  static create(props: StudentProps, id?: UniqueEntityID) {
    const student = new Student(
      {
        ...props,
      },
      id
    );

    return student;
  }
}
