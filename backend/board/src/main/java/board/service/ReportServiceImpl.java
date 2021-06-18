package board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import board.common.FileUtils;
import board.dto.BoardDto;
import board.dto.MemberDto;
import board.dto.StudyDto;
import board.mapper.BoardMapper;
import board.mapper.ReportMapper;

@Service
public class ReportServiceImpl implements ReportService{
	
	@Autowired
	private ReportMapper reportMapper;
	
	// 스터디 신고
	@Override
	public void reportStudy(int studyId, String memberId, String reportDescription) throws Exception {
		// TODO Auto-generated method stub
		reportMapper.reportStudy(studyId,memberId,reportDescription);
	}
	
	// 멤버 신고
	@Override
	public void reportMember(String memberId, String reportMemberId, String reportDescription) throws Exception {
		// TODO Auto-generated method stub
		reportMapper.reportMember(memberId,reportMemberId,reportDescription);
	}

}
