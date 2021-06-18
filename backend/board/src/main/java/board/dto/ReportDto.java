package board.dto;

import lombok.Data;

@Data
public class ReportDto {
	private int reportId;
	private String memberId;
	private int studyId;
	private String reportDescription;
	private String reportDate;
	private String reportMemberId;
	
}
