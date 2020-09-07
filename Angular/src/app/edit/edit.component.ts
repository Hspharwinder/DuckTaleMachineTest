import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CrudService } from '../Service/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  public formValue: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.formBuilderControl();
   }

  ngOnInit() {
    let id = this.gettParamId();
    this.initialData(id); 

  }

  gettParamId() {
    let id;
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  initialData(id: string) {
    this.service.getById(id).subscribe((res: any) => {
      this.formBinding(res);
    }, (error) => {
      console.log(error);
      
    })
  }

  formBuilderControl() {
    this.formValue = this.formBuilder.group({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      class: new FormControl(''),
      subjectMarks: this.formBuilder.group({ // make a nested group
        english: new FormControl(''),
        math: new FormControl(''),
        punjabi: new FormControl(''),
        hindi: new FormControl(''),
      }),
    });
  }

  formBinding(res: any) {

    let subjectMarks = {
      english: null,
      math: null,
      punjabi: null,
      hindi: null,
    };
    res.content.subjectMarks.forEach(element => {
      const subject = element.subject;
      subjectMarks[subject] = element.marks;
    });

    this.formValue.patchValue({
      id: res.content.id,
      firstName: res.content.firstName,
      lastName: res.content.lastName,
      class: res.content.class,
      subjectMarks:{
        english: subjectMarks.english,
        math: subjectMarks.math,
        punjabi: subjectMarks.punjabi,
        hindi: subjectMarks.hindi,
      }
    });
  }


  onSubmit(form: any) {
    const subjectMarks = this.addSubjectMarks(form);
    debugger;
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

  removeSubject = (subjectMarks) => { return subjectMarks.filter(x => x.marks !== null && x.marks !== ""); }

  postRequest = (form) => {
    this.service.put(form.value).subscribe((res) => {
      this.router.navigateByUrl('/home');
    }, (error) => {
      console.log(error);
    });
  }
}
