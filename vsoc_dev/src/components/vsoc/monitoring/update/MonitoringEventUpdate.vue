<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
      <span>리포트 수정</span>
    </section>
    <section class="step">
      <ul>
        <li class="active">
          <strong>Event Report</strong>
        </li>
        <li>
          <strong>Weakness Report</strong>
        </li>
        <li>
          <strong>Vulnerability Report</strong>
        </li>
        <li>
          <strong>Cybersecurity Incident Response Report</strong>
        </li>
      </ul>
    </section>
    <section class="page write">
      <article class="table">
        <p class="guide">
          * 표시는 필수 입력 항목입니다.
        </p>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>Event ID</th>
              <td>{{ getData?.id }}</td>
              <th>Source ID</th>
              <td>{{ getData?.sourceId }}</td>
            </tr>
            <tr>
              <th>Trigger ID</th>
              <td>{{ getData?.triggerId }}</td>
              <th>Keyword</th>
              <td>{{ getData?.keyword }}</td>
            </tr>
            <tr>
              <th class="required">제품명</th>
              <td class="input">
                <input type="text" placeholder="제품명을 입력해주세요" v-model="postData.data.productName"/>
              </td>
              <th class="required">프로젝트명</th>
              <td class="input">
                <input type="text" placeholder="프로젝트명을 입력해주세요" v-model="postData.data.projectName"/>
              </td>
            </tr>
            <tr>
              <th class="required">연관된 Asset</th>
              <td class="input">
                <input type="text" placeholder="Asset 이름을 입력해주세요" v-model="postData.data.associatedAsset"/>
              </td>
              <th class="required">CS Info 이름</th>
              <td class="input">
                <input type="text" placeholder="CS Information title을 입력해주세요" v-model="postData.data.csInfoName"/>
              </td>
            </tr>
            <tr>
              <th class="required">Description</th>
              <td colspan="3" class="input">
                <input type="text" placeholder="이벤트에 대한 설명을 입력해주세요" v-model="postData.data.description"/>
              </td>
            </tr>
            <tr>
              <th class="required">심각도/CVSS 점수
                <div class="tooltip">
                  <i></i>
                  <p>1 ~ 10사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="심각도 또는 CVSS 점수 입력 (1 ~ 10 사이 값)" 
                  v-model="postData.data.severityScore"
                  @input="onlyNumber($event, postData.data, 'severityScore')" />
              </td>
              <th class="required">수집된 URL</th>
              <td class="input">
                <input type="text" placeholder="수집된 URL을 입력해주세요" v-model="postData.data.collectionUrl"/>
              </td>
            </tr>
            <tr>
              <th class="required">보고자</th>
              <td class="input">
                <input type="text" placeholder="이벤트 최초 보고자의 이름을 입력해주세요" v-model="postData.data.reporter"/>
              </td>
              <th class="required">담당자</th>
              <td class="input">
                <input type="text" placeholder="담당자 이름을 입력해주세요" v-model="postData.data.manager"/>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button @click="openCancelConfirm" class="cancel">취소</button>
        <button @click="postfetch_event" :disabled="!isAllInput">저장</button>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '@/store/app';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';

const store = useAppStore();
const router = useRouter();
const route = useRoute();

// 이벤트 리포트 작성 데이터 상태값
const postData = ref({
  reportType: "event",
  data: {
    id: route.params.eventReportId,
    productName: "",
    projectName: "",
    associatedAsset: "",
    csInfoName: "",
    description: "",
    severityScore: null,
    collectionUrl: "",
    reporter: "",
    manager: "",
    matchedId: null,
    keyword: "",
  }
})

// 이벤트 리포트 상세조회 전체 데이터
const getData = ref(null);

// 사용자가 필수 요소를 모두 입력해야 버튼 활성화
const isAllInput = computed(() => {
  return Object.values(postData.value.data).every(
    (value) => value !== null && value !== undefined && value !== ""
  );
});

// 숫자만 입력하게 가능
const onlyNumber = (e, target, key) => {
  target[key] = e.target.value.replace(/[^0-9]/g, "");
}

// 이벤트 리포트 작성 POST 호출
const postfetch_event = async() => {
  try {
    const res = await axios.post('/api/vsoc/monitoring-report',postData.value);
    if(res.data.resultCode === -1) {
      alert('데이터 전송 실패')
    } else {
      openSaveDone();
    }
  } catch (error) {
    console.error(error);
    alert('데이터 전송 실패');
  }
}

// 모니터링 리포트 이벤트 리포트 상세조회 API 호출
const getfetch_event_detail = async() => {
  try {
    const eventReportId = route.params.eventReportId;
    const res = await axios.get(`/api/vsoc/monitoring-report/event/${eventReportId}`);
    getData.value = res.data.data.report;

    postData.value.data.productName = getData.value?.productName ?? ""
    postData.value.data.projectName = getData.value?.projectName ?? ""
    postData.value.data.associatedAsset = getData.value?.associatedAsset ?? ""
    postData.value.data.csInfoName = getData.value?.csInfoName ?? ""
    postData.value.data.description = getData.value?.description ?? ""
    postData.value.data.severityScore = getData.value?.severityScore ?? ""
    postData.value.data.collectionUrl = getData.value?.collectionUrl ?? ""
    postData.value.data.reporter = getData.value?.reporter ?? ""
    postData.value.data.manager = getData.value?.manager ?? ""
    postData.value.data.matchedId = getData.value?.matchedId
    postData.value.data.keyword = getData.value?.keyword
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// Modal
const goList = () => {
  router.push({
    name: 'monitoring_event_detail',
    params: { eventReportId: route.params.eventReportId },
  })
}

const openSaveDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "수정되었습니다.",
    btnText: "확인",

    rightBtn: () => { goList(); },
  })
};

const openCancelConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "success",
    textArea: "아직 등록되지 않은 내용이 있습니다. 페이지를 나가면 작성하신 내용이 모두 사라집니다.",

    rightBtn: () => { goList(); },
  })
};

onMounted(getfetch_event_detail);
</script>