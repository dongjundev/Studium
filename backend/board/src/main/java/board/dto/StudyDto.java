package board.dto;

import lombok.Data;

@Data
public class StudyDto {
	private int studyId;
	private String studyName;
	private String studyDescription;
	private String studyImage;
	private String studyLocation;
	private String studyTag;
	private String memberId;
	private int numOfMembers;
	private int eventId;
}
