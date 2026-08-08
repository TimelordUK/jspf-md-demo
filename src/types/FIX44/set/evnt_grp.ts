import { IEvntGrpNoEvents } from './evnt_grp_no_events'

/*
***********
* EvntGrp *
***********
*/
export interface IEvntGrp {
  NoEvents?: IEvntGrpNoEvents[]// [1] EventType.865, EventDate.866 .. EventText.868
}
