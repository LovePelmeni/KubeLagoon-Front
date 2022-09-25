<template>
  <div class="py-3 mb-3 border-radius-lg pe-1" :class="`bg-gradient-${color}`">
    <div class="chart">
      <canvas style="height: 170px; width: 400px; max-width: 1000px; display: block; box-sizing: border-box;" :id="id" class="chart-canvas" height="150"></canvas>
    </div>
  </div>
  <h6 class="mt-4 mb-0 ms-2" style="margin-top: 50px;">Total Resource Usage</h6>

  <!-- eslint-disable vue/no-v-html -->
  <p class="text-sm ms-2" v-html="description" />
  <div class="container border-radius-lg" style="max-height: 300px; height: 188px; align-items: center;">
    <div class="row" style="justify-content: space-between; display: flex; align-items: center;">
      <div
        v-for="(
          {
            label,
            progress: { content, percentage },
            icon: { color: colour, component },
          },
          index
        ) in items"
        :key="index"
        class="py-3 col-3 ps-0"
        style="align-items: center;"
      >
        <div class="mb-2 d-flex">
          <div
            class="text-center shadow icon icon-shape icon-xxs border-radius-sm me-2 d-flex align-items-center justify-content-center"
            :class="`bg-gradient-${colour}`" style="border-radius: 0.25rem;"
          >
            <font-awesome-icon
              :icon="component"
              size="xs"
              :style="{ color: 'white' }"
            />
          </div>
          <p class="mt-1 mb-0 text-xs font-weight-bold" style="margin-top: 50px;">{{ label }}</p>
        </div>
        <h4 class="font-weight-bolder" style="margin-right: 15px;">{{ content }}</h4>
        <div class="progress w-75">
          <div
            class="progress-bar bg-dark"
            :style="`width: ${percentage}% !important`"
            :class="`w-${percentage}`"
            role="progressbar"
            :aria-valuenow="percentage"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "CapacityChart",
  components: {
    FontAwesomeIcon,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "dark",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    chart: {
      type: Object,
      required: true,
      labels: Array,
      datasets: {
        type: Object,
        label: String,
        data: Array,
      },
    },
    items: {
      type: Array,
      default: () => {
        [];
      },
    },
  },
  mounted() {
    var ctx = document.getElementById(this.id).getContext("2d");
    let chartStatus = Chart.getChart(this.id);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.chart.labels,
        datasets: [
          {
            label: this.chart.datasets.label,
            tension: 0.4,
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: "#fff",
            data: this.chart.datasets.data,
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 500,
              beginAtZero: true,
              padding: 15,
              font: {
                size: 14,
                family: "Open Sans", // You can change it up if you want
                style: "normal",
                lineHeight: 2,
              },
              color: "#fff",
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });
  },
};
</script>