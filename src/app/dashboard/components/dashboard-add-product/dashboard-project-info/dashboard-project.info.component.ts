import {Component, EventEmitter, Output} from '@angular/core';
import {DashboardService} from '../../../services/dashboard.service';
import {UtilsService} from '../../../../core-module/services/utils.service';

@Component({
  selector: 'app-dashboard-project-info',
  templateUrl: './dashboard-project.info.component.html',
  styleUrls: ['./dashboard-project.info.component.scss']
})

export class DashboardProjectInfoComponent {
  @Output() done = new EventEmitter<boolean>();
  private step = 0;
  constructor(private dashboardService: DashboardService) {
  }
  selectCategory(category) {
    this.dashboardService.product.category = category;
  }

  nextStep() {
    this.step++;
  }

  previousStep() {
    this.step--;
  }

  finishBasic() {
    this.done.emit(true);
  }

}
