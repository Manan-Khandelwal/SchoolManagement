// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { StudentService } from '../../services/student.service';
import { ExamService } from '../../services/exam.service';
import { ClassService } from '../../services/class.service';
// Import Models
import { Student } from '../../domain/school-management_db/student';
import { Class } from '../../domain/school-management_db/class';
import { Exam } from '../../domain/school-management_db/exam';

// START - USED SERVICES
/**
* StudentService.create
*	@description CRUD ACTION create
*
* StudentService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* StudentService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* ExamService.findBy_Student
*	@description CRUD ACTION findBy_Student
*	@param Objectid key Id of model to search for
*
* ClassService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Student
 */
@Component({
    selector: 'app-student-edit',
    templateUrl: 'student-edit.component.html',
    styleUrls: ['student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
    item: Student;
    list_Classes: Class[];
    externalExam__Student: Exam[];
    model: Student;
    formValid: Boolean;

    constructor(
    private studentService: StudentService,
    private examService: ExamService,
    private classService: ClassService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Student();
        this.externalExam__Student = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.studentService.get(id).subscribe(item => this.item = item);
                this.examService.findBy_Student(id).subscribe(list => this.externalExam__Student = list);
            }
            // Get relations
            this.classService.list().subscribe(list => this.list_Classes = list);
        });
    }

    /**
     * Check if an Class is in  _Classes
     *
     * @param {string} id Id of Class to search
     * @returns {boolean} True if it is found
     */
    containClass(id: string): boolean {
        if (!this.item._Classes) return false;
        return this.item._Classes.indexOf(id) !== -1;
    }

    /**
     * Add Class from Student
     *
     * @param {string} id Id of Class to add in this.item._Classes array
     */
    addClass(id: string) {
        if (!this.item._Classes)
            this.item._Classes = [];
        this.item._Classes.push(id);
    }

    /**
     * Remove an Class from a Student
     *
     * @param {number} index Index of Class in this.item._Classes array
     */
    removeClass(index: number) {
        this.item._Classes.splice(index, 1);
    }

    /**
     * Save Student
     *
     * @param {boolean} formValid Form validity check
     * @param Student item Student to save
     */
    save(formValid: boolean, item: Student): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.studentService.update(item).subscribe(data => this.goBack());
            } else {
                this.studentService.create(item).subscribe(data => this.goBack());
            } 
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }


}



