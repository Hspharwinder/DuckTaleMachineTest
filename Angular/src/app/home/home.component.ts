import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'MachineTest';
  public getData: any[];
  filterList: any = ['class', 'subject'];
  selectedFilter:any = undefined;
  abcFilter: any = { firstName: '', lastName: '' };
  searchText: any;
  constructor(private service: CrudService) { }

  ngOnInit() {
    this.service.get().subscribe((res: any) => {
      this.getData = res.content;
      // console.log(this.getData);
    }, (error) => {
      console.log(error);
    });
  }


  delete(id: string) {
    this.service.delete(id).subscribe((res: any) => {
      this.getData = res.content;
    }, (error) => {
      console.log(error);
    });
  }

  onSelectChange() {
    // console.log(this.selectedFilter);
    if (this.selectedFilter) {
      this.abcFilter.firstName = this.searchText;
      this.abcFilter.lastName = this.searchText;
    }

    console.log(this.abcFilter);
  }

  inputChange() {
    // console.log(this.selectedFilter);
    if (this.selectedFilter) {
      this.abcFilter.firstName = this.searchText;
      this.abcFilter.lastName = this.searchText;
    }

    // console.log(this.abcFilter);
  }
}
