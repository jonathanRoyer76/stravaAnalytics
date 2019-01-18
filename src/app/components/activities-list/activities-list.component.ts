import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivitiesListDataSource, ActivitiesListItem, ActivitiesListItemClass } from './activities-list-datasource';
import { ActivitiesService } from 'src/app/services/activities.service';
import { TimeMethods } from 'src/app/configuration/timeMethods';
import { UtilsMethods } from 'src/app/configuration/utils';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ActivitiesListDataSource = new ActivitiesListDataSource();

  constructor(
    private activitiesService : ActivitiesService
  ){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'date', 'name', 'duration', 'averageSpeed', 'distance'];

  ngOnInit() {
    this.dataSource = new ActivitiesListDataSource(this.paginator, this.sort);
    this.activitiesService.getCompleteActivitiesList().subscribe(data=>{
      let activitiesArray : ActivitiesListItem[] = [];      
      data.forEach(element => {
        let activity : ActivitiesListItem = new ActivitiesListItemClass();
        activity.id           = element.id,
        activity.name         = element.name,
        activity.date         = new Date(element.start_date_local),
        activity.distance     = parseFloat((element.distance / 1000).toFixed(3)),
        activity.duration     = TimeMethods.convertSecondsInMinutes(element.moving_time),
        activity.averageSpeed = TimeMethods.convertSecondsInMinutes(
          parseFloat((element.moving_time/activity.distance).toFixed(2))
        )
        activity.kmByHour     = UtilsMethods.getKmByHourFromSeconds(element.moving_time, element.distance)
        activitiesArray.push(activity) 
      });
      this.dataSource.setDatas(activitiesArray);
    })    
  }
}
