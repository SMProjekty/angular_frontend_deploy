import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IWorker} from '../interfaces';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit{

  workers: IWorker[] = [];
  workersInfo:any;
  idToDel!: number;
  addNewWorker!: FormGroup;
  editWorkerForm!: FormGroup;
  workerIdToUpdate!: number;
  listOfColors: any = null;
  event: any;
  pickedColor!: string;

  modalData: any = {
    'name': null,
    'surname': null,
    'color': null,
    'photo': null
  };

  constructor(private service: SharedService, private formBuilder: FormBuilder) {
    // this.shortDate = this.datePipe.transform(this.nowDate, 'yyyy-MM-dd');
    // this.dateNav = this.shortDate as string;
  }

  ngOnInit(): void {
    this.addNewWorker = this.formBuilder.group({
      name: [],
      surname: [],
      file: []
    });

    this.editWorkerForm = this.formBuilder.group({
      name: [],
      surname: [],
      photo: [],
      file: []
    });

    this.getListOfColors()
    this.getListOfWorkers();
  }

  getListOfWorkers() {
    this.service.listOfWorkers().subscribe((res: IWorker[]) => {
      this.workers = res;
    });
  }

  getListOfColors() {
    this.service.listOfColors().subscribe(res => {
      this.listOfColors = res;
    });
  }

  workerIdToModal(id: Number) {
    this.idToDel = Number(id);
  }

  dataToModal(id: Number) {
    let index = this.workers.findIndex((obj: { id: Number; }) => obj.id === id);
    console.log(this.workers[index]);
    this.modalData['name'] = this.workers[index]['name'];
    this.modalData['surname'] = this.workers[index]['surname'];
    this.modalData['photo'] = this.workers[index]['photo'];
    this.modalData['color'] = this.workers[index]['color'];
    this.workerIdToUpdate = this.workers[index]['id'];
  }

  deleteWorker() {
    if (this.idToDel != undefined)
      this.service.deleteWorker(this.idToDel).subscribe(res => {
        this.getListOfWorkers();
      });
  }

  addWorker(){
    const fd = new FormData();
    const photo = this.event.target.files[0];
    fd.append('photo', photo);
    const post_data = {
      "name": this.addNewWorker.get('name')?.value,
      "surname": this.addNewWorker.get('surname')?.value,
      "color": this.pickedColor
    };
    fd.append('content', JSON.stringify(post_data));
    console.log(post_data);
    this.service.addWorker(fd).subscribe(res => {
    });
  }

  editWorker() {
    const fd = new FormData();
    if (this.event.target.files[0] != null || this.event.target.files[0] != undefined) {
      const photo = this.event.target.files[0];
      fd.append('photo', photo);
    }
    const post_data = {
      "name": this.addNewWorker.get('name')?.value != null ? this.addNewWorker.get('name')?.value : this.modalData['name'],
      "surname": this.addNewWorker.get('surname')?.value != null ? this.addNewWorker.get('surname')?.value : this.modalData['surname'],
      "color": this.pickedColor != null ? this.pickedColor : this.modalData['color']
    };
    fd.append('content', JSON.stringify(post_data));
    console.log(post_data);
    this.service.editWorker(this.workerIdToUpdate, fd).subscribe(res => {
      console.log(res);
    });
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    console.log('File input', file);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('content', JSON.stringify({test: 'I am a test !'}));
    this.service.saveImages(fd).subscribe((event => {
        })
    );
  }

  pickColor(code: string) {
    if (this.pickColor != undefined) {
      document.querySelectorAll('.color-div').forEach(color => {
          color.classList.remove('color-darker');
      });
    }
    this.pickedColor = code;
    document.querySelectorAll('.color-div').forEach(color => {
      if(color.id != code)
        color.classList.add('color-darker');
    });
  }

}
