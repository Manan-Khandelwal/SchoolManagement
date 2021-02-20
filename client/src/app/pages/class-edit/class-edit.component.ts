// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { ClassService } from '../../services/class.service';
import { ExamService } from '../../services/exam.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';
// Import Models
import { Class } from '../../domain/school-management_db/class';
import { Exam } from '../../domain/school-management_db/exam';
import { Student } from '../../domain/school-management_db/student';
import { Teacher } from '../../domain/school-management_db/teacher';

// START - USED SERVICES
/**
* ClassService.create
*	@description CRUD ACTION create
*
* ClassService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* ClassService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* ExamService.findBy_Class
*	@description CRUD ACTION findBy_Class
*	@param Objectid key Id of model to search for
*
* TeacherService.findBy_Classes
*	@description CRUD ACTION findBy_Classes
*	@param Objectid key Id of model to search for
*
* StudentService.findBy_Classes
*	@description CRUD ACTION findBy_Classes
*	@param Objectid key Id of model to search for
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Class
 */
@Component({
    selector: 'app-class-edit',
    templateUrl: 'class-edit.component.html',
    styleUrls: ['class-edit.component.css']
})
export class ClassEditComponent implements OnInit {
    item: Class;
    externalExam__Class: Exam[];
    externalStudent__Classes: Student[];
    externalTeacher__Classes: Teacher[];
    model: Class;
    formValid: Boolean;

    constructor(
    private classService: ClassService,
    private examService: ExamService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Class();
        this.externalExam__Class = [];
        this.externalStudent__Classes = [];
        this.externalTeacher__Classes = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.classService.get(id).subscribe(item => this.item = item);
                this.examService.findBy_Class(id).subscribe(list => this.externalExam__Class = list);
                this.studentService.findBy_Classes(id).subscribe(list => this.externalStudent__Classes = list);
                this.teacherService.findBy_Classes(id).subscribe(list => this.externalTeacher__Classes = list);
            }
            // Get relations
        });
    }


    /**
     * Save Class
     *
     * @param {boolean} formValid Form validity check
     * @param Class item Class to save
     */
    save(formValid: boolean, item: Class): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.classService.update(item).subscribe(data => this.goBack());
            } else {
                this.classService.create(item).subscribe(data => this.goBack());
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



