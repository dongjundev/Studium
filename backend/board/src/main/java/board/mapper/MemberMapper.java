package board.mapper;

import org.apache.ibatis.annotations.Mapper;

import board.dto.MemberDto;

@Mapper
public interface MemberMapper {
	String loginCheck(MemberDto member) throws Exception;
	
	//------은지
	void insertMember(MemberDto member) throws Exception;		//회원가입	
	int idChk(MemberDto member) throws Exception;		//회원가입 아이디 중복 체크
	
	void studyJoin(MemberDto member) throws Exception;		//스터디 가입
}