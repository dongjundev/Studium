package board.dto;

import lombok.Data;

@Data
public class StudyDto {
	private int studyId;
	private String studyName;
	private String studyDescription;
	private String studyLocation;
	private String studyTopics;
}
