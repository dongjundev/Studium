package board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public void studyJoin(String memberId,int studyId) throws Exception{
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("memberId", memberId);
		map.put("studyId", studyId);
		System.out.println("서비스단"+memberId+studyId);
		studyMapper.studyJoin(map);
	}
	
	// ----------------------------------스터디 만들기
	@Override
	public void insertStudy(StudyDto study) throws Exception {
		// TODO Auto-generated method stub
		studyMapper.insertStudy(study);
	} 
	
	// ---------------------------------스터디 장소 예약
	@Override
	public void insertLocation(StudyDto study) throws Exception{
		studyMapper.insertLocation(study);
	}
	
	// ---------------------------------스터디 이벤트
	@Override
	public List<StudyDto> selectStudyEvent(int studyId) throws Exception{
		List<StudyDto> studyEvent=studyMapper.selectStudyEvent(studyId);
		return studyEvent;
	}
	
	// ---------------------------------이벤트 상세
	@Override
	public StudyDto selectEventDetail(int eventId) throws Exception{
		StudyDto eventDetail=studyMapper.selectEventDetail(eventId);
		return eventDetail;
	}
	
	// ---------------------------------스터디 중복 체크
	@Override
	public String studyJoinChk(int studyId) throws Exception {
		// TODO Auto-generated method stub
		String result=studyMapper.studyJoinChk(studyId);
		return result;
	}
	// ---------------------------------이벤트 참석 체크
	@Override
	public String eventJoinChk(int eventId) throws Exception{
		String result=studyMapper.eventJoinChk(eventId);
		return result;
	}
	
	// ---------------------------------이벤트 참석
	@Override
	public void eventJoin(int eventId,String memberId) throws Exception{
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("eventId",eventId);
		map.put("memberId", memberId);
		System.out.println("서비스단"+memberId+eventId);
		studyMapper.eventJoin(map);
	}
	
	// ---------------------------------이벤트 리스트
	@Override
	public List<StudyDto> selectEventList() throws Exception {
		// TODO Auto-generated method stub
		return studyMapper.selectEventList();
	}
}
