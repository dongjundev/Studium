package board.service;

import java.util.List;
import java.util.Map;

import board.dto.MemberDto;
import board.dto.StudyDto;

public interface StudyService {
	List<StudyDto> selectStudyList() throws Exception;
	List<StudyDto> searchStudy(String searchCondition,String searchKeyword) throws Exception; 	//스터디 검색
	StudyDto selectStudyDetail(int studyId) throws Exception; //스터디 상세보기
	void studyJoin(String memberId,int studyId) throws Exception; //스터디 가입
	
	void insertStudy(StudyDto study) throws Exception; //스터디 만들기
	
	void insertLocation(StudyDto study) throws Exception; //스터디 장소 예약
	
	List<StudyDto> selectStudyEvent(int studyId) throws Exception; //스터디 이벤트
	
	StudyDto selectEventDetail(int eventId) throws Exception; //이벤트 디테일
	
	String studyJoinChk(int studyId) throws Exception; //스터디 가입 중복 체크
	
	String eventJoinChk(int eventId) throws Exception; //이벤트 참석 체크
	
	void eventJoin(int eventId,String memberId) throws Exception; //이벤트 참석
}
