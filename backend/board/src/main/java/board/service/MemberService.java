package board.service;

import java.util.List;

import board.dto.BoardDto;
import board.dto.MemberDto;
import board.dto.StudyDto;

public interface MemberService {
	public String loginCheck(MemberDto member) throws Exception;
	
	// -------------- 은지
	void insertMember(MemberDto member) throws Exception;
	int idChk(MemberDto member) throws Exception;
	
	public String login(String MemberId) throws Exception;
	
	List<MemberDto> selectStudyMember(int studyId) throws Exception; //스터디 멤버

}
