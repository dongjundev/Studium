package board.service;

import board.dto.MemberDto;
import board.dto.BoardDto;
import board.dto.StudyDto;

public interface ReportService {
	void reportStudy(int studyId, String memberId, String reportDescription) throws Exception; //스터디 신고
	void reportMember(String memberId, String reportMemberId, String reportDescription) throws Exception; //멤버 신고
}
