package board.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import board.dto.BoardDto;
import board.dto.MemberDto;
import board.dto.StudyDto;
import board.mapper.MemberMapper;
import board.mapper.StudyMapper;

@Service
public class StudyServiceImpl implements StudyService {

	@Autowired
	private StudyMapper studyMapper;
	
	@Autowired
	private MemberMapper memberMapper;
	
	@Override
	public List<StudyDto> selectStudyList() throws Exception {
		// TODO Auto-generated method stub
		
		return studyMapper.selectStudyList();
	}

	// ---------------------------------스터디 검색
		@Override
		public List<StudyDto> searchStudy(String searchCondition,String searchKeyword) throws Exception {
			// TODO Auto-generated method stub
			Map<String,String> map=new HashMap<String,String>();
			map.put("searchCondition", searchCondition);
			map.put("searchKeyword", searchKeyword);
			//System.out.println("서비스단"+searchCondition+searchKeyword);
			return studyMapper.searchStudy(map);
		}
		
	// ---------------------------------검색한 스터디 상세보기
	@Override
	public StudyDto selectStudyDetail(int studyId) throws Exception {
		// TODO Auto-generated method stub
		StudyDto study=studyMapper.selectStudyDetail(studyId);
		return study;
	}
	
	// ---------------------------------스터디 가입
	@Override
	public void studyJoin(MemberDto member) throws Exception{
		memberMapper.studyJoin(member);
	} 
}
