package board.service;

import java.util.List;

import board.dto.BoardDto;
import board.dto.MemberDto;
import board.dto.StudyDto;

public interface MemberService {
	public String loginCheck(MemberDto member) throws Exception; 
	
	// -------------- 은지
	void insertMember(MemberDto member) throws Exception;
	int idChk(String memberId) throws Exception;	
	int studyJoinChk(String memberId,int studyId) throws Exception; //스터디 가입 중복 체크
	
	public String login(String MemberId) throws Exception;
	
	List<MemberDto> selectStudyMember(int studyId) throws Exception; //스터디 멤버
	
	MemberDto selectStudyMemberDetail(String memberId) throws Exception; //스터디 멤버 상세보기
	
	String loginName(String memberId) throws Exception; //로그인 된 유저의 이름 가져오기

}
