package board.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import board.dto.BoardDto;
import board.dto.BoardFileDto;
import board.dto.MemberDto;
import board.dto.StudyDto;
import board.service.BoardService;
import board.service.MemberService;
import board.service.StudyService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ReactController {
	int glo_studyId;
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private StudyService studyService;

	// get all board 
	@GetMapping("/board")
	public List<BoardDto> getAllBoards() throws Exception {
		// 임시로 넣어둔 studyId 값
		int studyId=1;
		return boardService.selectBoardList(studyId);
	}
	
	@GetMapping(value = {"/home", "/"})
	public List<StudyDto> selectStudyList() throws Exception{
		
//		List<StudyDto> list = studyService.selectStudyList();
//		System.out.println("값 :: "+studyService.selectStudyList());
//		System.out.println("스터디 확인 :: "+list);
//		System.out.println("태크 확인 :: "+list.get(0).getStudyTag());
//		String[] tags = list.get(0).getStudyTag().split(",");
//		
//		for(int i=0; i<tags.length; i++) {
//			System.out.println(tags[i]);
//		}
		
		return studyService.selectStudyList();
	}
	
	@GetMapping("/test")
	public List<StudyDto> seletTest(@RequestParam("no") int no) throws Exception{
		System.out.println("받은 값 :: "+no);
		return null;
		
	}
	
    // 스터디 상세보기
	@GetMapping("/testDetail")
    public ArrayList openStudyDetail(@RequestParam(defaultValue="studyId")int studyId) throws Exception{		
 
		ArrayList list=new ArrayList();
 
    	//System.out.println("studyID 확인:: "+studyId);
    	StudyDto study = studyService.selectStudyDetail(studyId);
    	
    	glo_studyId=studyId;
    	
    	//스터디 이벤트
    	List<StudyDto> event= studyService.selectStudyEvent(studyId);
    	
    	//스터디 멤버
    	List<MemberDto> member= memberService.selectStudyMember(studyId);
    	
    	list.add(member);
    	list.add(study);
    	list.add(event);
    	
    	//mv.addObject("study", study);
    	//mv.addObject("event", event);
    	//mv.addObject("member", member);
    	
    	//System.out.println("studyDetail member 출력 :: "+member);
    	
    	return list;
    }

}
