/**
 *
 *
  _____                      _              _ _ _     _   _     _        __ _ _
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|

 * DO NOT EDIT THIS FILE!!
 *
 *  FOR CUSTOMIZE studentBaseService PLEASE EDIT ../student.service.ts
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
 // DEPENDENCIES
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// CONFIG
import { environment } from '../../../environments/environment';

// MODEL
import { Student } from '../../domain/school-management_db/student';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR CUSTOMIZE IT EDIT ../Student.service.ts
 */

/*
 * SCHEMA DB Student
 *
	{
		dob: {
			type: 'Date',
			required : true
		},
		name: {
			type: 'String',
			required : true
		},
		surname: {
			type: 'String',
			required : true
		},
		//RELATIONS
		//EXTERNAL RELATIONS
		_Classes: [{
			type: Schema.ObjectId,
			ref : "Student"
		}],
		_Student: {
			type: Schema.ObjectId,
			ref : "Exam"
		},
	}
 *
 */
@Injectable()
export class StudentBaseService {

    contextUrl: string = environment.endpoint + '/student';
    constructor(
        protected http: HttpClient
        ) { }

    // CRUD METHODS

    /**
    * StudentService.create
    *   @description CRUD ACTION create
    *
    */
    create(item: Student): Observable<Student> {
        return this.http
            .post<Student>(this.contextUrl, item)
            .pipe(map(data => data));
    }

    /**
    * StudentService.delete
    *   @description CRUD ACTION delete
    *   @param ObjectId id Id
    *
    */
    remove(id: string): Observable<void> {
        return this.http
            .delete<void>(this.contextUrl + '/' + id)
            .pipe(map(data => data));
    }

    /**
    * StudentService.findBy_Classes
    *   @description CRUD ACTION findBy_Classes
    *   @param Objectid key Id of model to search for
    *
    */
    findBy_Classes(id: string): Observable<Student[]> {
        return this.http
            .get<Student[]>(this.contextUrl + '/findBy_Classes/' + id)
            .pipe(
                map(response => response)
            );
    }

    /**
    * StudentService.get
    *   @description CRUD ACTION get
    *   @param ObjectId id Id resource
    *
    */
    get(id: string): Observable<Student> {
        return this.http
            .get<Student>(this.contextUrl + '/' + id)
            .pipe(map(data => data));
    }

    /**
    * StudentService.list
    *   @description CRUD ACTION list
    *
    */
    list(): Observable<Student[]> {
        return this.http
            .get<Student[]>(this.contextUrl)
            .pipe(map(data => data));
    }

    /**
    * StudentService.update
    *   @description CRUD ACTION update
    *   @param ObjectId id Id
    *
    */
    update(item: Student): Observable<Student> {
        return this.http
            .post<Student>(this.contextUrl + '/' + item._id, item)
            .pipe(map(data => data));
    }


    // Custom APIs

}