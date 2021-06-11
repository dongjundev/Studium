package board.dto;

import lombok.Data;

@Data
public class StudyDto {
	private int studyId;
	private String studyName;
	private String studyDescription;
	private String studyLocation;
	private String studyTopics;
	
	//스터디 이벤트
	private int eventId;
	private String eventName;
	private String eventDescription;
}
