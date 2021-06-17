package board.dto;

import lombok.Data;

@Data
public class StudyDto {
	private int studyId;
	private String studyName;
	private String studyDescription;
	private String studyLocation;
	
	//스터디 이벤트
	private int eventId;
	private String eventName;
	private String eventDescription;
	
	//추가
	private String studyTag;
	private String memberId;
	//private String eventId;
	private int memberCnt;
	
	//스터디이벤트 추가

	private String eventDate;
	private String eventLocation;
	private String eventHostId;
	private String eventAttendentId;
}
