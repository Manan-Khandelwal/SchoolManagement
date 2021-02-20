// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { TeacherService } from '../../services/teacher.service';
import { ExamService } from '../../services/exam.service';
import { ClassService } from '../../services/class.service';
// Import Models
import { Teacher } from '../../domain/school-management_db/teacher';
import { Class } from '../../domain/school-management_db/class';
import { Exam } from '../../domain/school-management_db/exam';

// START - USED SERVICES
/**
* TeacherService.create
*	@description CRUD ACTION create
*
* TeacherService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* TeacherService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* ExamService.findBy_Teacher
*	@description CRUD ACTION findBy_Teacher
*	@param Objectid key Id of model to search for
*
* ClassService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Teacher
 */
@Component({
    selector: 'app-teacher-edit',
    templateUrl: 'teacher-edit.component.html',
    styleUrls: ['teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {
    item: Teacher;
    list_Classes: Class[];
    externalExam__Teacher: Exam[];
    model: Teacher;
    formValid: Boolean;

    constructor(
    private teacherService: TeacherService,
    private examService: ExamService,
    private classService: ClassService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Teacher();
        this.externalExam__Teacher = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.teacherService.get(id).subscribe(item => this.item = item);
                this.examService.findBy_Teacher(id).subscribe(list => this.externalExam__Teacher = list);
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
     * Add Class from Teacher
     *
     * @param {string} id Id of Class to add in this.item._Classes array
     */
    addClass(id: string) {
        if (!this.item._Classes)
            this.item._Classes = [];
        this.item._Classes.push(id);
    }

    /**
     * Remove an Class from a Teacher
     *
     * @param {number} index Index of Class in this.item._Classes array
     */
    removeClass(index: number) {
        this.item._Classes.splice(index, 1);
    }

    /**
     * Save Teacher
     *
     * @param {boolean} formValid Form validity check
     * @param Teacher item Teacher to save
     */
    save(formValid: boolean, item: Teacher): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.teacherService.update(item).subscribe(data => this.goBack());
            } else {
                this.teacherService.create(item).subscribe(data => this.goBack());
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



