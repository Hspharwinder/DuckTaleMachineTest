import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, ControlContainer, Validators } from '@angular/forms';
import { CrudService } from '../Service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public formValue: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private service: CrudService,
    private router: Router,
    ) {
    this.formBuilderControl();
   }

  ngOnInit() {
  }

  formBuilderControl() {
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: new FormControl(''),
      class: ['', Validators.required],
      subjectMarks: this.formBuilder.group({ // make a nested group
        english: new FormControl(null),
        math: new FormControl(null),
        punjabi: new FormControl(null),
        hindi: new FormControl(null),
      }),

    //   subjectMarks: this.formBuilder.group([
    //     { subject: "english", marks:null },
    //     { subject: "match", marks: null },
    //     { subject: "punjabi", marks: null },
    //     { subject: "hindi", marks: null },
    //   ]),
    });
  }

  onSubmit(form: any) {
    const subjectMarks = this.addSubjectMarks(form);
    form.value.subjectMarks = this.removeSubject(subjectMarks);

    if (!form.value.firstName || !form.value.class || form.value.subjectMarks.length < 1)
      return alert("First Name, Class and Marks of atleast 1 subject are required");
      
    this.postRequest(form);   
  }

  addSubjectMarks = (form) => {
    return [
      { subject: "english", marks: form.value.subjectMarks.english },
      { subject: "math", marks: form.value.subjectMarks.math },
      { subject: "punjabi", marks: form.value.subjectMarks.punjabi },
      { subject: "hindi", marks: form.value.subjectMarks.hindi }
    ];
  }

  removeSubject = (subjectMarks) => { return subjectMarks.filter(x => x.marks !== null && x.marks !== "");}

  postRequest = (form) => {
    this.service.post(form.value).subscribe((res) => {
      this.router.navigateByUrl('/home');
    }, (error) => {
      console.log(error);
    });
  }
}
