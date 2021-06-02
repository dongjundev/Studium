package board.service;

import board.dto.MemberDto;

public interface MemberService {
	public String loginCheck(MemberDto member) throws Exception;
	
	// -------------- 은지
	void insertMember(MemberDto member) throws Exception;
	int idChk(MemberDto member) throws Exception;
}
