package board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import board.dto.MemberDto;
import board.dto.StudyDto;
import board.mapper.MemberMapper;

@Service
public class MemberServicempl implements MemberService{
	
	@Autowired
	private MemberMapper memberMapper;
	
	@Override
	public String loginCheck(MemberDto member) throws Exception {
		// TODO Auto-generated method stub
		String name = memberMapper.loginCheck(member);
		System.out.println(name);
		return name;
	}
	
	
	
	
	// ------은지
	@Override
	public void insertMember(MemberDto member) throws Exception {
		// TODO Auto-generated method stub
		memberMapper.insertMember(member);
	}

	@Override
	public int idChk(String memberId) throws Exception {
		// TODO Auto-generated method stub
		int result=memberMapper.idChk(memberId);
		return result;
	}
	
	@Override
	public String login(String MemberId) throws Exception{
		String dbPwd=memberMapper.login(MemberId);
		return dbPwd;
	}
	
	// ---------------------------------스터디 멤버
	@Override
	public List<MemberDto> selectStudyMember(int studyId) throws Exception{
		List<MemberDto> studyMember=memberMapper.selectStudyMember(studyId);
		return studyMember;
	}
	
	//
	@Override
	public MemberDto selectStudyMemberDetail(String memberId) throws Exception{
		MemberDto member=memberMapper.selectStudyMemberDetail(memberId);
		return member;
	}
	
	@Override
	public int studyJoinChk(MemberDto member) throws Exception {
		// TODO Auto-generated method stub
		int result=memberMapper.studyJoinChk(member);
		return result;
	}

}
